<?php

namespace App\Models\chat;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
class Conversation extends Model
{
    protected $fillable = ['user_id', 'contact_id'];

    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId)
                     ->orWhere('contact_id', $userId);
    }

    public function contact($userId) {
        return User::where('id', $this->user_id == $userId ? $this->contact_id : $this->user_id)->first();
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
