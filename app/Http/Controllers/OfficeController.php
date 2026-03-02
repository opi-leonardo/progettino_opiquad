<?php

namespace App\Http\Controllers;

use App\Models\Offices;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\StoreOfficeRequest;

class OfficeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $offices = Offices::paginate(10);
        return Inertia::render('Offices/Index', [
            'offices' => $offices
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Offices/Edit');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOfficeRequest $request)
    {
        Offices::create($request->validated());

        return redirect()->route('offices.index')->with('success', 'Office created successfully!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Offices $office)
    {
        return Inertia::render('Offices/Edit', ['office' => $office]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreOfficeRequest $request, Offices $office)
    {
        $office->update($request->validated());
        return redirect()->route('offices.index')->with('success', 'Office edited successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Offices $office)
    {
        $office->delete();

        return back()->with('success', 'Deleted successfully');
    }
}