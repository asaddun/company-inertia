<?php

namespace App\Http\Requests\Report;

use Illuminate\Foundation\Http\FormRequest;

class ReportIndexRequest extends FormRequest
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
            'per_page' => 10,
            'search'   => null,
            'date'   => null,
            'range'   => null,
            'sort'     => '-work_date',
        ];
    }

    public function validatedWithDefaults(): array
    {
        return array_merge(self::defaults(), $this->validated());
    }
}
