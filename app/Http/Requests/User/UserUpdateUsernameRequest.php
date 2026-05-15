<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserUpdateUsernameRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'current_password' => [
                'required',
                'current_password',
            ],
            'username' => [
                'required',
                'string',
                'min:3',
                'max:20',
                'regex:/^[a-zA-Z0-9._-]+$/',
                Rule::unique('users', 'username')
                    ->ignore($this->user())
            ],
        ];
    }
}
