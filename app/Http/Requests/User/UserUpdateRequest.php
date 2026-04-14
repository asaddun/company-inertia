<?php

namespace App\Http\Requests\User;

use App\Enums\UserLevel;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UserUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('user'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Admin: name, level, phone, bank_account_number
        // User: name, username, password, identity_number
        return [
            'name' => ['string', 'max:255'],
            'username' => ['unique:users,username', 'string', 'max:255'],
            'password' => ['string', 'min:8', 'confirmed'],
            'level' => [new Enum(UserLevel::class)],
            'phone' => ['nullable', 'integer'],
            'identity_number' => ['nullable', 'integer'],
            'bank_account_number' => ['nullable', 'integer'],
        ];
    }
}
