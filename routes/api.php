<?php

use App\Http\Controllers\Api\KaizenTopMonth;
use App\Http\Controllers\TestController;
use App\Models\Base005m;
use App\Models\Base099m;
use App\Models\Base24m;
use App\Models\Hr001m;
use App\Models\UserToken;
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


Route::get("get-user", function(Request $request) {
    $token = $request->header("access_token");
    $token = "ec70d70b-caff-40c6-b5fc-491a61fa4dea";
    if($token === "") return [];
    $data = UserToken::query()->where('UserToken', $token)->first();
    $userCode = $data->UserCode;
    $hr001m = Hr001m::query()->where("STAFF_NO", $userCode)->first();
    $udf01 = $hr001m->udf01;
    $staffDepartment = $hr001m->staff_department;
    return ["info" => $data, "permission" => $udf01, "staff_department" => $staffDepartment];
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
