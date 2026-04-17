<?php

namespace App\Http\Requests\JobType;

use Illuminate\Foundation\Http\FormRequest;

class JobTypeUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('jobType'));
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
            'wage_per_item' => ['decimal:0,2', 'max:255'],
            'current_price' => ['decimal:0,2', 'max:255'],
        ];
    }
}
