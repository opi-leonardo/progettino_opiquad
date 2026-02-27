<?php

namespace App\Http\Controllers;

use App\Models\Users;
use App\Models\Offices;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\StoreUserRequest;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = Users::with('office')->get();
        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $offices = Offices::all();
        return Inertia::render('Users/Create', ['offices' => $offices]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {

        // Save to database
        Users::create([
            'nome' => $request->nome,
            'cognome' => $request->cognome,
            'email' => $request->email,
            'giornoCorto' => $request->giornoCorto,
            'office_id' => $request->officeId,

        ]);        
        return redirect('/users')->with('success', 'User created successfully!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Users $user)
    {
        $offices = Offices::all();
        return Inertia::render('Users/Edit', ['user' => $user, 'offices'=> $offices]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreUserRequest $request, Users $user)
    {
        $user->update([
            'nome'  => $request->nome,
            'cognome'  => $request->cognome,
            'email'   => $request->email,
            'giornoCorto'   => $request->giornoCorto,
        ]);
        return redirect()->route('users.index')->with('success', 'User edited successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Users $user)
    {
        $user->delete();

        return back()->with('success', 'Deleted successfully');
    }
}
