<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class StoreOfficeRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'night_shift' => ['required', 'boolean'],
            'nome' => ['required', 'string', 'max:255'],
            'inizioOrarioIngresso' => [
                'required',
                'date_format:H:i',
            ],
            'fineOrarioIngresso' => [
                'required',
                'date_format:H:i',
                Rule::when(
                    $this->night_shift == 0,
                    ['after_or_equal:inizioOrarioIngresso']
                ),               
            ],
            'inizioOrarioUscita' => [
                'required',
                'date_format:H:i',
                Rule::when(
                    $this->night_shift == 0,
                    ['after:inizioOrarioIngresso']
                ),
            ],
            'fineOrarioUscita' => [
                'required',
                'date_format:H:i',
                Rule::when(
                    $this->night_shift == 0,
                    ['after_or_equal:inizioOrarioUscita']
                ),
            ],
        ];
    }
}
