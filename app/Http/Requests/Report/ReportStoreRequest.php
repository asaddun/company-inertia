<?php

namespace App\Http\Requests\Report;

use App\Models\Report;
use Illuminate\Foundation\Http\FormRequest;

class ReportStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('create', Report::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'job_type_id'   => ['required', 'exists:job_types,id'],
            'work_date'     => ['required', 'date'],
            'quantity'      => ['required', 'numeric', 'min:1'],
            'stored'        => ['nullable', 'numeric', 'min:1'],
        ];
    }
}
