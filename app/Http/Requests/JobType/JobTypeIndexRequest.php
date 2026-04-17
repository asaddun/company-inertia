<?php

namespace App\Http\Requests\JobType;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class JobTypeIndexRequest extends FormRequest
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
            //
        ];
    }

    public static function defaults(): array
    {
        return [
            'status'   => 'active',
            'per_page' => 10,
            'search'   => null,
            'sort'     => null,
        ];
    }

    public function validatedWithDefaults(): array
    {
        return array_merge(self::defaults(), $this->validated());
    }
}
