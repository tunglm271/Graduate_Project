<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use TCG\Voyager\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class CreateVoyagerAdmin extends Command
{
    protected $signature = 'custom:voyager-admin {email} {--create}';
    protected $description = 'Create a Voyager admin user with role assigned';

    public function handle()
    {
        $email = $this->argument('email');
        $create = $this->option('create');

        if ($create) {
            $name = $this->ask('Enter the admin name');
            $password = $this->secret('Enter admin password');
            $passwordConfirm = $this->secret('Confirm Password');

            if ($password !== $passwordConfirm) {
                $this->error('Passwords do not match.');
                return;
            }

            $role = Role::where('name', 'admin')->first();
            if (!$role) {
                $this->error('Role "admin" does not exist. Please run db:seed.');
                return;
            }

            $user = User::create([
                'name' => $name,
                'email' => $email,
                'password' => Hash::make($password),
                'role_id' => $role->id, // Gán role_id
            ]);

            $this->info("Admin user '{$email}' created successfully with role 'admin'.");
        }
    }
}
