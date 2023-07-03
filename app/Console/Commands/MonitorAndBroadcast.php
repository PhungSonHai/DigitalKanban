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

    private function getData($department)
    {
        $data = [];

        $result = DB::select("SELECT
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
                scan_date BETWEEN TO_DATE('2023/06/30 07:30:00', 'yyyy/mm/dd HH24:MI:SS') AND TO_DATE('2023/06/30 16:30:00', 'yyyy/mm/dd HH24:MI:SS')
                AND scan_detpt = '$department'
        ) q
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
                level <= 3
            UNION ALL
            SELECT
                to_char(TO_DATE('15:30', 'hh24:mi'), 'hh24:mi') AS time_from,
                to_char(TO_DATE('16:30', 'hh24:mi'), 'hh24:mi') AS time_to
            FROM
                dual
        ) t ON q.time_scan >= t.time_from
               AND q.time_scan <= t.time_to
    GROUP BY
        time_from,
        time_to
    ORDER BY
        time_from");

        for ($i = 0; $i < 8; $i++) {
            array_push($data, $result[$i]->qty);
        }

        return $data;
    }

    public function handle()
    {
        $pusher = new Pusher(env('PUSHER_APP_KEY'), env('PUSHER_APP_SECRET'), env('PUSHER_APP_ID'), [
            'host' => env('PUSHER_HOST'),
            'port' => env('PUSHER_PORT')
        ]);

        while (true) {
            $channels = $pusher->getChannels()->channels;

            foreach ($channels as $key => $value) {
                if ($pusher->getChannelInfo($key)->subscription_count) {
                    $department = explode('.', $key)[1];
                    event(new RealTimeChart(["department" => $department, "result" => $this->getData($department)]));
                }
            }

            sleep(1);
        }
    }
}
