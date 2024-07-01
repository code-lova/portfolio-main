<x-mail::message>
# Hello {{ $data['name']  }} ..!!
# Your message was sent successfully.

@component('mail::panel')
Thank you for contacting me, i will get across to you as soon as possible.<br>
@endcomponent

Thanks<br>
{{ config('app.name') }}
</x-mail::message>
