<?php

namespace App\Http\Requests\JobType;

use App\Models\JobType;
use Illuminate\Foundation\Http\FormRequest;

class JobTypeStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('create', JobType::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'unit_label' => ['string', 'max:255'],
            'wage_per_item' => ['decimal:0,2'],
            'current_price' => ['decimal:0,2'],
            'form_fields' => ['array']
        ];
    }
}
