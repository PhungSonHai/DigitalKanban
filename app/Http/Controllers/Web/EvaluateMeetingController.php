<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EvaluateMeeting;

class EvaluateMeetingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $evaluateMeeting;

    public function __construct(EvaluateMeeting $evaluateMeeting)
    {
        $this->evaluateMeeting = $evaluateMeeting;
    }

    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        try 
        {
            if($request && $request->line_code && $request->evaluate_date) {
                $existEvaluate = $this->evaluateMeeting->where([["line_code", $request->line_code], ["evaluate_date", $request->evaluate_date]])->first();

                if($existEvaluate) {
                    return response()->json(["error" => "Hôm nay đã thực hiện đánh giá"], 400);
                }

                $dataCreate = [
                    "line_code" => $request->line_code,
                    "evaluate_date" => $request->evaluate_date,
                    "point_1" => $request->point_1,
                    "point_2" => $request->point_2,
                    "point_3" => $request->point_3,
                    "point_4" => $request->point_4,
                    "point_5" => $request->point_5,
                    "point_6" => $request->point_6,
                    "point_7" => $request->point_7,
                    "point_8" => $request->point_8,
                    "point_9" => $request->point_9,
                    "point_10" => $request->point_10,
                    "total_point" => $request->total_point
                ];

                $resCreate = $this->evaluateMeeting->create($dataCreate);
                
                if($resCreate) {
                    return response()->json(["message" => "Thành công"], 200);
                }
            }

            return response()->json(["error" => "Lưu đánh giá cuộc họp thất bại"], 400);
        } 
        catch (\Throwable $th) 
        {
            return response()->json(["error" => "Lưu đánh giá cuộc họp thất bại"], 400);
        }
    }

    public function getAllEvaluate()
    {
        try 
        {
            $data = $this->evaluateMeeting->get();
            return response()->json(["message" => "Thành công", "data" => $data], 200);
        } 
        catch (\Throwable $th) 
        {
            return response()->json(["error" => "Lấy đánh giá thất bại"], 400);
        }
    }

    public function getListPoint(Request $request)
    {
        try 
        {   
            if($request->line_code && $request->evaluate_date) {
                $data = $this->evaluateMeeting->where([["line_code", $request->line_code], ["evaluate_date", $request->evaluate_date]])->first();
                return response()->json(["message" => "Thành công", "data" => $data], 200);
            }
        } 
        catch (\Throwable $th) 
        {
            return response()->json(["error" => "Lấy danh sách điểm thất bại"], 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
