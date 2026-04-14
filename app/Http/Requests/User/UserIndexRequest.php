<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UserIndexRequest extends FormRequest
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
            'status'     => 'nullable|in:active,trash',
            'type'       => 'nullable|in:all,employee,member',
            'search'     => 'nullable|string|max:100',
            'page'       => 'nullable|integer|min:1',
            'per_page'   => 'nullable|integer|min:1|max:100',
            'sort'       => 'nullable|string', // contoh: name atau -created_at
        ];
    }

    public function validatedWithDefaults(): array
    {
        return array_merge([
            'status'   => 'active',
            'type'     => 'employee',
            'per_page' => 10,
            'search'   => null,
            'sort'     => null,
        ], $this->validated());
    }
}
