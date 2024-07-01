<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;


class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {

            if ($request->user()->tokenCan('server:admin')) {
                return $next($request);
            } else {
                return response()->json(['message' => 'Access Denied'], 403);
            }
        } else {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    }
}
