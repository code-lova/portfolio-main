<x-mail::message>
# Hello Sir..!!
# You have a new message from {{ $data['name']  }}.

@component('mail::panel')
This is a notification.<br>
<b>MESSAGE</b>: <br>
{{ $data['message'] }}<br>
Email: {{ $data['email'] }}
@endcomponent


Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
