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
        $offices = Offices::all();
        return Inertia::render('Offices/Index', [
            'offices' => $offices
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Offices/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOfficeRequest $request)
    {
        Offices::create([
            'nome' => $request['nome'],
            'cognome' => $request['cognome'],
            'email' => $request['email'],
            'giornoCorto' => $request['giornoCorto'],
            'office_id' => $request['officeId'],
            'inizioOrarioIngresso' => $request['inizioOrarioIngresso'],
            'fineOrarioIngresso' => $request['fineOrarioIngresso'],
            'inizioOrarioUscita' => $request['inizioOrarioUscita'],
            'fineOrarioUscita' => $request['fineOrarioUscita'],
        ]);

        return redirect()->route('offices.index')->with('success', 'Office created successfully!');
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
        $office = Offices::findOrFail($id);
        return Inertia::render('Offices/Edit', ['office' => $office]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreOfficeRequest $request, string $id)
    {
        $office = Offices::findOrFail($id);
        $office->update([
            'nome'                  => $request->nome,
            'inizioOrarioIngresso'  => $request->inizioOrarioIngresso,
            'fineOrarioIngresso'    => $request->fineOrarioIngresso,
            'inizioOrarioUscita'    => $request->inizioOrarioUscita,
            'fineOrarioUscita'      => $request->fineOrarioUscita
        ]);
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