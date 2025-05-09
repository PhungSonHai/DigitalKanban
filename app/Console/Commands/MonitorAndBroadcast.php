<?php

namespace App\Console\Commands;

use App\Events\RealTimeChart;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Pusher\Pusher;

class MonitorAndBroadcast extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:monitor-and-broadcast';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */

    private $data = [];

    function getWorkHours($department)
    {
        $data = DB::select("
            SELECT
                D_DEPT,
                WORK_DAY,
                DATETYPE,
                F_HOUR,
                T_HOUR
            FROM
                MES_WORKINGHOURS_02
            WHERE
                D_DEPT = '$department' AND
                WORK_DAY = TO_DATE('".date('d/m/Y')."', 'dd/mm/yyyy')
        ");

        return $data;
    }

    private function getData($department)
    {
        $data = [];

        $result = DB::select("
            SELECT
                time_from,
                time_to,
                nvl(SUM(label_qty), '0') AS qty
            FROM
                (
                    SELECT
                        label_qty,
                        to_char(scan_date, 'HH24:MI') time_scan
                    FROM
                        sfc_trackout_list
                    WHERE
                        scan_date BETWEEN TO_DATE('" . date('Y/m/d') . " 07:30:00', 'yyyy/mm/dd HH24:MI:SS') AND TO_DATE('" . date('Y/m/d') . " 16:30:00', 'yyyy/mm/dd HH24:MI:SS')
                        AND scan_detpt = '$department'
                ) q
            RIGHT JOIN 
                (
                    SELECT
                        to_char(TO_DATE('06:30', 'hh24:mi') + level / 24, 'hh24:mi') AS time_from,
                        to_char(TO_DATE('07:29', 'hh24:mi') + level / 24, 'hh24:mi') AS time_to
                    FROM
                        dual
                    CONNECT BY
                        level <= 4
                    UNION ALL
                    SELECT
                        to_char(TO_DATE('11:30', 'hh24:mi') + level / 24, 'hh24:mi') AS time_from,
                        to_char(TO_DATE('12:29', 'hh24:mi') + level / 24, 'hh24:mi') AS time_to
                    FROM
                        dual
                    CONNECT BY
                        level <= 6
                    UNION ALL
                    SELECT
                        to_char(TO_DATE('18:30', 'hh24:mi'), 'hh24:mi') AS time_from,
                        to_char(TO_DATE('20:30', 'hh24:mi'), 'hh24:mi') AS time_to
                    FROM
                        dual
                ) t ON q.time_scan >= t.time_from
                    AND q.time_scan <= t.time_to
            GROUP BY
                time_from,
                time_to
            ORDER BY
                time_from"
        );

        for ($i = 0; $i < 11; $i++) {
            array_push($data, $result[$i]->qty);
        }

        return $data;
    }

    function getTarget($department)
    {
        $data = DB::select("select work_qty from sjqdms_worktarget where work_day = TO_DATE('" . date('Y/m/d') . "', 'yyyy/mm/dd') and grt_dept = '$department' and org_id = '0'");

        if (count($data) == 0)
            return 0;
        return $data[0]->work_qty;
    }

    private function getActualRFT($department)
    {

        $data = [];

        $result = DB::select("
        SELECT 
            time_from, 
            time_to, 
            nvl(CASE
                    WHEN SUM(q.success) + SUM(q.fail) = 0 THEN 0
                ELSE 
                    ROUND(SUM(q.success) / (SUM(q.success) + SUM(q.fail)) * 100, 0)
                END, 0) AS RFT 
        FROM   
            (SELECT
                SUM(CASE WHEN b.commit_type = '0' THEN 1 ELSE 0 END) AS success,
                SUM(CASE WHEN b.commit_type = '1' THEN 1 ELSE 0 END) AS fail,
                to_char(TO_DATE(b.createtime, 'HH24:MI:SS'), 'HH24:MI') createtime
            FROM
                tqc_task_m a
                LEFT JOIN tqc_task_commit_m b ON a.task_no = b.task_no
            WHERE 
                to_date(a.createdate, 'yyyy-mm-dd') = to_date('" . date('Y/m/d') . "', 'yyyy/mm/dd') 
                and a.production_line_code = '$department'
            GROUP BY a.production_line_code, b.createtime) q
            RIGHT JOIN (
                SELECT
                    to_char(TO_DATE('06:30', 'hh24:mi') + level / 24, 'hh24:mi') AS time_from,
                    to_char(TO_DATE('07:29', 'hh24:mi') + level / 24, 'hh24:mi') AS time_to
                FROM
                    dual
                CONNECT BY
                    level <= 4
                UNION ALL
                SELECT
                    to_char(TO_DATE('11:30', 'hh24:mi') + level / 24, 'hh24:mi') AS time_from,
                    to_char(TO_DATE('12:29', 'hh24:mi') + level / 24, 'hh24:mi') AS time_to
                FROM
                    dual
                CONNECT BY
                    level <= 6
                UNION ALL
                SELECT
                    to_char(TO_DATE('18:30', 'hh24:mi'), 'hh24:mi') AS time_from,
                    to_char(TO_DATE('20:30', 'hh24:mi'), 'hh24:mi') AS time_to
                FROM
                    dual
            ) t ON q.createtime >= t.time_from AND q.createtime <= time_to
        GROUP BY
            time_from,
            time_to
        ORDER BY
            time_from
        ");

        for ($i = 0; $i < 11; $i++) {
            array_push($data, $result[$i]->rft);
        }

        return $data;
    }

    private function getActualAllRFT($department)
    {
        $result = DB::select("
        SELECT
            CASE
                WHEN statics.success + statics.fail = 0 THEN
                    0
                ELSE
                    round(statics.success /(statics.success + statics.fail) * 100, 0)
            END AS rft
        FROM
            (
                SELECT
                    m.production_line_code,
                    m.createdate,
                    SUM((
                        SELECT
                            COUNT(t.commit_type)
                        FROM
                            tqc_task_commit_m t
                        WHERE
                                t.task_no = m.task_no
                            AND t.commit_type = '0'
                    )) AS success,
                    SUM((
                        SELECT
                            COUNT(t.commit_type)
                        FROM
                            tqc_task_commit_m t
                        WHERE
                                t.task_no = m.task_no
                            AND t.commit_type = '1'
                    )) AS fail
                FROM
                    tqc_task_m m
                WHERE
                    to_date(m.createdate, 'yyyy-mm-dd') = to_date('" . date('Y/m/d') . "', 'yyyy-mm-dd') and m.production_line_code = '$department'
                GROUP BY
                    m.production_line_code,
                    m.createdate
                ORDER BY
                    m.createdate DESC
            ) statics
        ");

        if (count($result) == 0)
            return 0;
        return $result[0]->rft;
    }

    private function getActualStitchingQuanlity($department)
    {
        $result = DB::select("
            SELECT
                a.*,
                CASE
                    WHEN ( (
                        SELECT
                            COUNT(1)
                        FROM
                            rqc_task_detail_t
                        WHERE
                            task_no = a.task_no
                    ) > 0 ) THEN
                        to_char(round(((
                            SELECT
                                COUNT(1)
                            FROM
                                rqc_task_detail_t
                            WHERE
                                    task_no = a.task_no
                                AND commit_type = '0'
                        ) /(
                            SELECT
                                COUNT(1)
                            FROM
                                rqc_task_detail_t
                            WHERE
                                task_no = a.task_no
                        )), 4) * 100)
                        || '%'
                    ELSE
                        '0%'
                END AS qty_percent_rft
            FROM
                (
                    SELECT
                        m.task_no,
                        m.workshop_section_no,
                        m.prod_no,
                        m.mer_po,
                        m.production_line_code,
                        m.createdate,
                        m.modifydate,
                        m.modifytime,
                        m.department,
                        (
                            CASE
                                WHEN task_state = '0' THEN
                                    'Progress'
                                WHEN task_state = '1' THEN
                                    'Stop'
                                WHEN task_state = '2' THEN
                                    'End'
                            END
                        ) AS task_state,
            -- (case  
                --	when check_type='0' then '抽检' 
                --	when check_type='1' then '巡线'
                -- end) as check_type,
                        (
                            CASE
                                WHEN result = '0' THEN
                                    'PASS'
                                WHEN result = '1' THEN
                                    'FAIL'
                            END
                        ) AS result
                    FROM
                        rqc_task_m   m
                        LEFT JOIN bdm_rd_style r ON m.shoe_no = r.shoe_no
                    WHERE
                            1 = 1
                        AND m.workshop_section_no LIKE '%S%'
                        AND m.modifydate = to_char(sysdate, 'yyyy-mm-dd')
                        AND m.production_line_code = '". $department ."'
                    ORDER BY 
                        m.modifytime DESC
                    FETCH FIRST ROW ONLY
                ) a
        ");

        if (count($result) == 0)
            return [0];
        return $result[0]->qty_percent_rft;
    }

    public function handle()
    {
        $pusher = new Pusher(env('PUSHER_APP_KEY'), env('PUSHER_APP_SECRET'), env('PUSHER_APP_ID'), [
            'host' => env('PUSHER_HOST'),
            'port' => env('PUSHER_PORT')
        ]);

        while (true) {
            try {
                $channels = $pusher->getChannels()->channels;

                foreach ($channels as $key => $value) {
                    if ($pusher->getChannelInfo($key)->subscription_count) {
                        $department = explode('.', $key)[1];
                        event(new RealTimeChart(["department" => $department, "result" => [$this->getData($department), $this->getActualRFT($department)], "target" => $this->getTarget($department), "actualAllRFT" => $this->getActualAllRFT($department), "actualStitchingQuanlity" => $this->getActualStitchingQuanlity($department), "workHours" => $this->getWorkHours($department)]));
                    }
                }
            } catch (\Exception $e) {
                echo $e->getMessage();
            }

            sleep(1);
        }
    }
}
