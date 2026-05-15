<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateInfoRequest extends FormRequest
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
            'name' => ['string', 'max:255'],
            'phone' => ['nullable', 'string', 'regex:/^[0-9]+$/'],
            'identity_number' => ['nullable', 'string', 'regex:/^[0-9]+$/'],
            'bank_account_number' => ['nullable', 'string', 'regex:/^[0-9]+$/'],
        ];
    }
}
