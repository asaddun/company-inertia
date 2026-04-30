<?php

namespace App\Http\Requests\Payroll;

use Illuminate\Foundation\Http\FormRequest;

class PayrollIndexRequest extends FormRequest
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
            'status' => ['nullable', 'in:active,trash'],
            'type' => ['nullable', 'in:all,draft,submitted,approved,paid'],
            'search' => ['nullable', 'string', 'max:100'],
            'date' => ['nullable', 'date'],
            'range' => ['nullable', 'array'],
            'range.*' => ['date'],
            'page' => ['nullable', 'integer', 'min:1'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
            'sort' => ['nullable', 'string'],
        ];
    }

    public static function defaults(): array
    {

        return [
            'status'   => 'active',
            'type'   => 'all',
            'per_page' => 10,
            'search'   => null,
            'date'   => null,
            'range'   => null,
            'sort'     => '-created_at',
        ];
    }

    public function validatedWithDefaults(): array
    {
        return array_merge(self::defaults(), $this->validated());
    }
}
