<?php

namespace App\Http\Requests\JobType;

use App\Models\JobType;
use Illuminate\Foundation\Http\FormRequest;

class JobTypeBulkUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        foreach ($this->input('data', []) as $row) {
            $type = JobType::find($row['id']);

            if (!$type || !$this->user()->can('update', $type)) {
                return false;
            }
        }

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
            'data' => ['required', 'array'],
            'data.*.id' => ['required', 'exists:job_types,id'],
            'data.*.name' => ['required', 'string', 'max:255'],
            'data.*.wage_per_item' => ['decimal:0,2'],
            'data.*.current_price' => ['decimal:0,2'],
        ];
    }
}
