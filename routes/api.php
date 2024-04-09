<?php

use App\Http\Controllers\Api\KaizenTopMonth;
use App\Http\Controllers\TestController;
use App\Models\Base005m;
use App\Models\Base099m;
use App\Models\Base24m;
use App\Models\Hr001m;
use App\Models\UserToken;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get("test", [TestController::class, 'index']);
// Route::get("test2", function(){
//     $getUser = UserToken::query()->where('UserCode', 'sonhai-phung')->get();
//     return $getUser;
// });
Route::post("test2", function (Request $request) {
    $file = $request->file("file");

    if (!file_exists(public_path('uploads') . "/" . $file->getClientOriginalName())) {
        echo $file->move(public_path('uploads'), $file->getClientOriginalName());
    } else {
        echo "tồn tại";
    }
    return "ok";
});

Route::get("get-department", function () {
    return Base005m::query()->where(['factory_sap' => 4001])->orderBy('DEP_SAP')->get(["DEP_SAP", "DEPARTMENT_CODE", "DEPARTMENT_NAME"]);
});

Route::get("get-department2", function () {
    return Base099m::query()->get('COSTCENTER_NAME');
});

Route::get("get-process", function () {
    return Base24m::query()->orderBy('ROUT_NAME_Z')->get(["ROUT_NO", "ROUT_NAME_Z"]);
});

Route::get("get-plant", function () {
    return Base099m::query()->where([['udf01', '4000'], ['COSTCENTER_NAME', 'like', 'XƯỞNG%']])->get('COSTCENTER_NAME');
});

Route::post("insert-kaizen", [KaizenTopMonth::class, 'add']);
Route::get("get-kaizen", [KaizenTopMonth::class, 'get']);
Route::post("delete-kaizen", [KaizenTopMonth::class, 'delete']);
Route::post("update-kaizen", [KaizenTopMonth::class, 'update']);


Route::get("get-user", function (Request $request) {
    $token = $request->header("authorization");
    $token = "0d8164c9-745e-4bf4-937c-6882d9ffc115";
    if ($token === "") return [];
    $data = UserToken::query()->where('UserToken', $token)->first();
    $userCode = $data->UserCode;
    $hr001m = Hr001m::query()->where("STAFF_NO", $userCode)->first();
    $udf01 = $hr001m->udf01;
    $staffDepartment = $hr001m->staff_department;
    return ["info" => $data, "permission" => $udf01, "staff_department" => $staffDepartment];
});

Route::get("query", function (Request $request) {
    $from = Carbon::createFromFormat('Y-m-d', $request->from);
    $to = Carbon::createFromFormat('Y-m-d', $request->to);
    $department = $request->department;

    if ($to->diffInDays($from) > 7) {
        return [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];
    }

    $data = [];
    $data2 = [];
    $result = DB::select("
        SELECT
            time_from,
            time_to,
            nvl(SUM(label_qty) / (to_date('" . $to->format('d/m/Y') . "', 'dd/mm/yyyy') + 1 - to_date('" . $from->format('d/m/Y') . "', 'dd/mm/yyyy')), '0')  AS qty
        FROM
            (
                SELECT
                    label_qty,
                    to_char(scan_date, 'HH24:MI') time_scan
                FROM
                    sfc_trackout_list
                WHERE
                    scan_date BETWEEN TO_DATE('" . $from->format('Y/m/d') . " 07:30:00', 'yyyy/mm/dd HH24:MI:SS') AND TO_DATE('" . $to->format('Y/m/d') . " 20:00:00', 'yyyy/mm/dd HH24:MI:SS')
                    AND scan_detpt = '{$department}'
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
                    level <= 6
                UNION ALL
                SELECT
                    to_char(TO_DATE('18:30', 'hh24:mi'), 'hh24:mi') AS time_from,
                    to_char(TO_DATE('20:00', 'hh24:mi'), 'hh24:mi') AS time_to
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

    $result2 = DB::select("
        SELECT 
            time_from, 
            time_to, 
            nvl((CASE
                    WHEN SUM(q.success) + SUM(q.fail) = 0 THEN 0
                ELSE 
                    ROUND(SUM(q.success) / (SUM(q.success) + SUM(q.fail)) * 100, 0)
                END) / (to_date('" . $to->format('d/m/Y') . "', 'dd/mm/yyyy') + 1 - to_date('" . $from->format('d/m/Y') . "', 'dd/mm/yyyy')), 0) AS RFT 
        FROM   
            (SELECT
                SUM(CASE WHEN b.commit_type = '0' THEN 1 ELSE 0 END) AS success,
                SUM(CASE WHEN b.commit_type = '1' THEN 1 ELSE 0 END) AS fail,
                to_char(TO_DATE(b.createtime, 'HH24:MI:SS'), 'HH24:MI') createtime
            FROM
                tqc_task_m a
                LEFT JOIN tqc_task_commit_m b ON a.task_no = b.task_no
            WHERE 
                to_date(a.createdate, 'yyyy-mm-dd') BETWEEN to_date('" . $from->format('Y/m/d') . "', 'yyyy/mm/dd') and to_date('" . $to->format('Y/m/d') . "', 'yyyy/mm/dd') 
                and a.production_line_code = '{$department}'
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
                    to_char(TO_DATE('20:00', 'hh24:mi'), 'hh24:mi') AS time_to
                FROM
                    dual
            ) t ON q.createtime >= t.time_from AND q.createtime <= time_to
        GROUP BY
            time_from,
            time_to
        ORDER BY
            time_from"
    );

    $result3 = DB::select("
        select 
            nvl(trunc(sum(work_qty  / (to_date('" . $to->format('d/m/Y') . "', 'dd/mm/yyyy') + 1 - to_date('" . $from->format('d/m/Y') . "', 'dd/mm/yyyy')))), 0) as qty 
        from 
            sjqdms_worktarget 
        where 
            work_day BETWEEN TO_DATE('" . $from->format('Y/m/d') . "', 'yyyy/mm/dd') and TO_DATE('" . $to->format('Y/m/d') . "', 'yyyy/mm/dd') and grt_dept = '{$department}'"
    );

    $result4 = DB::select("
        SELECT
            nvl(trunc(sum(CASE
                WHEN statics.success + statics.fail = 0 THEN
                    0
                ELSE
                    round(statics.success /(statics.success + statics.fail) * 100, 0)
            END) / (to_date('" . $to->format('d/m/Y') . "', 'dd/mm/yyyy') + 1 - to_date('" . $from->format('d/m/Y') . "', 'dd/mm/yyyy'))), 0) AS rft
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
                    to_date(m.createdate, 'yyyy-mm-dd') BETWEEN TO_DATE('" . $from->format('Y/m/d') . "', 'yyyy/mm/dd') and TO_DATE('" . $to->format('Y/m/d') . "', 'yyyy/mm/dd') and m.production_line_code = '{$department}'
                GROUP BY
                    m.production_line_code,
                    m.createdate
                ORDER BY
                    m.createdate DESC
            ) statics"
    );

    // $result5 = DB::select("
    //     SELECT
    //         a.*,
    //         CASE
    //             WHEN ( (
    //                 SELECT
    //                     COUNT(1)
    //                 FROM
    //                     rqc_task_detail_t
    //                 WHERE
    //                     task_no = a.task_no
    //             ) > 0 ) THEN
    //                 to_char(round(((
    //                     SELECT
    //                         COUNT(1)
    //                     FROM
    //                         rqc_task_detail_t
    //                     WHERE
    //                             task_no = a.task_no
    //                         AND commit_type = '0'
    //                 ) /(
    //                     SELECT
    //                         COUNT(1)
    //                     FROM
    //                         rqc_task_detail_t
    //                     WHERE
    //                         task_no = a.task_no
    //                 )), 4) * 100)
    //                 || '%'
    //             ELSE
    //                 '0%'
    //         END AS qty_percent_rft
    //     FROM
    //         (
    //             SELECT
    //                 m.task_no,
    //                 m.workshop_section_no,
    //                 m.prod_no,
    //                 m.mer_po,
    //                 m.production_line_code,
    //                 m.createdate,
    //                 m.modifydate,
    //                 m.modifytime,
    //                 m.department,
    //                 (
    //                     CASE
    //                         WHEN task_state = '0' THEN
    //                             'Progress'
    //                         WHEN task_state = '1' THEN
    //                             'Stop'
    //                         WHEN task_state = '2' THEN
    //                             'End'
    //                     END
    //                 ) AS task_state,
    //     -- (case  
    //         --	when check_type='0' then '抽检' 
    //         --	when check_type='1' then '巡线'
    //         -- end) as check_type,
    //                 (
    //                     CASE
    //                         WHEN result = '0' THEN
    //                             'PASS'
    //                         WHEN result = '1' THEN
    //                             'FAIL'
    //                     END
    //                 ) AS result
    //             FROM
    //                 rqc_task_m   m
    //                 LEFT JOIN bdm_rd_style r ON m.shoe_no = r.shoe_no
    //             WHERE
    //                     1 = 1
    //                 AND m.workshop_section_no LIKE '%S%'
    //                 AND m.modifydate = to_char(sysdate, 'yyyy-mm-dd')
    //                 AND m.production_line_code = '". $department ."'
    //             ORDER BY 
    //                 m.modifytime DESC
    //             FETCH FIRST ROW ONLY
    //         ) a
    // ");

    $result5 = DB::select("
        SELECT 
            FLOOR(
                AVG(CAST(REPLACE(qty_percent_rft, '%', '') AS DECIMAL))
            ) AS avg_qty_percent_rft
        FROM (
            -- Đoạn mã query gốc
            SELECT
                a.*,
                CASE
                    WHEN (
                        (
                            SELECT COUNT(1)
                            FROM rqc_task_detail_t
                            WHERE task_no = a.task_no
                        ) > 0
                    ) THEN
                        to_char(
                            round(
                                (
                                    (
                                        SELECT COUNT(1)
                                        FROM rqc_task_detail_t
                                        WHERE task_no = a.task_no
                                        AND commit_type = '0'
                                    ) / (
                                        SELECT COUNT(1)
                                        FROM rqc_task_detail_t
                                        WHERE task_no = a.task_no
                                    )
                                ), 4
                            ) * 100
                        ) || '%'
                    ELSE
                        '0%'
                END AS qty_percent_rft
            FROM (
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
                    (
                        CASE
                            WHEN result = '0' THEN
                                'PASS'
                            WHEN result = '1' THEN
                                'FAIL'
                        END
                    ) AS result,
                    ROW_NUMBER() OVER (PARTITION BY m.createdate ORDER BY m.modifytime DESC) AS rn
                FROM
                    rqc_task_m   m
                    LEFT JOIN bdm_rd_style r ON m.shoe_no = r.shoe_no
                WHERE
                    1 = 1
                    AND m.workshop_section_no LIKE '%S%'
                    AND to_date(m.createdate, 'yyyy-MM-dd') BETWEEN TO_DATE('". $from->format("Y-m-d") ."', 'yyyy-MM-dd') AND TO_DATE('". $to->format("Y-m-d") ."', 'yyyy-MM-dd')
                    AND m.production_line_code = '". $department ."'
            ) a
            WHERE
                a.rn = 1
        ) subquery
    ");

    for ($i = 0; $i < 11; $i++) {
        array_push($data, (int)$result[$i]->qty);
        array_push($data2, (int)$result2[$i]->rft);
    }

    // return [$data, $data2, (int)$result3[0]->qty, (int)$result4[0]->rft, empty($result5) ? [] : [(int)str_replace('%', '', $result5[0]->qty_percent_rft)]];
    return [$data, $data2, (int)$result3[0]->qty, (int)$result4[0]->rft, $result5[0]->avg_qty_percent_rft];
});

// Route::get("get-test", function () {
//     return DB::select("SELECT
//     time_from,
//     time_to,
//     nvl(SUM(label_qty), '0') AS qty
// FROM
//     (
//         SELECT
//             label_qty,
//             to_char(scan_date, 'HH24:MI') time_scan
//         FROM
//             sfc_trackout_list
//         WHERE
//             scan_date BETWEEN TO_DATE('2023/06/30 07:30:00', 'yyyy/mm/dd HH24:MI:SS') AND TO_DATE('2023/06/30 16:30:00', 'yyyy/mm/dd HH24:MI:SS')
//             AND scan_detpt = '4001APL01'
//     ) q
//     RIGHT JOIN (
//         SELECT
//             to_char(TO_DATE('06:30', 'hh24:mi') + level / 24, 'hh24:mi') AS time_from,
//             to_char(TO_DATE('07:29', 'hh24:mi') + level / 24, 'hh24:mi') AS time_to
//         FROM
//             dual
//         CONNECT BY
//             level <= 4
//         UNION ALL
//         SELECT
//             to_char(TO_DATE('11:30', 'hh24:mi') + level / 24, 'hh24:mi') AS time_from,
//             to_char(TO_DATE('12:29', 'hh24:mi') + level / 24, 'hh24:mi') AS time_to
//         FROM
//             dual
//         CONNECT BY
//             level <= 3
//         UNION ALL
//         SELECT
//             to_char(TO_DATE('15:30', 'hh24:mi'), 'hh24:mi') AS time_from,
//             to_char(TO_DATE('16:30', 'hh24:mi'), 'hh24:mi') AS time_to
//         FROM
//             dual
//     ) t ON q.time_scan >= t.time_from
//            AND q.time_scan <= t.time_to
// GROUP BY
//     time_from,
//     time_to
// ORDER BY
//     time_from");
// });
