<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\APHIssueProduction;

class IssueProductionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $issueProduction;

    public function __construct(APHIssueProduction $issueProduction)
    {
        $this->issueProduction = $issueProduction;
    }

    public function index()
    {
        //
    }

    public function addIssue(Request $request)
    {
        try 
        {
            if($request->line_code) {
                $issueExist = $this->issueProduction->where([["line_code", $request->line_code], ["affect", $request->affect], ["reason", $request->reason], ["description_reason", $request->description_reason], ["action_resolve", $request->action_resolve], ["responsible", $request->responsible], ["is_solved", 0]])->first();

                if($issueExist) {
                    return response()->json(["error" => "Vấn đề này đã được thêm đang đợi giải quyết"], 400);
                }

                $dataCreate = [
                    "line_code" => $request->line_code,
                    "affect" => $request->affect,
                    "reason" => $request->reason,
                    "description_reason" => $request->description_reason,
                    "action_resolve" => $request->action_resolve,
                    "responsible" => $request->responsible
                ];

                $resCreate = $this->issueProduction->create($dataCreate);

                if($resCreate) {
                    return response()->json(["message" => "Thêm vấn đề thành công"], 200);
                }
            }

            return response()->json(["error" => "Thêm vấn đề lỗi"], 400);
        } 
        catch (\Throwable $th) 
        {
            return response()->json(["error" => "Thêm vấn đề lỗi"], 400);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
