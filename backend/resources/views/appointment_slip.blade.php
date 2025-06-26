<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Phiếu khám bệnh</title>
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            background: #f6f8fa;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 480px;
            margin: 32px auto;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.07);
            padding: 32px 24px;
        }
        .header {
            text-align: center;
            margin-bottom: 18px;
        }
        .clinic-info {
            font-size: 15px;
            color: #444;
            margin-bottom: 8px;
        }
        .title {
            font-size: 20px;
            font-weight: bold;
            color: #1976d2;
            margin-bottom: 8px;
        }
        .appointment-code {
            font-size: 18px;
            font-weight: bold;
            color: #d32f2f;
            margin-bottom: 16px;
        }
        .details-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 18px;
        }
        .details-table td {
            padding: 8px 4px;
            border-bottom: 1px solid #f0f0f0;
            font-size: 15px;
        }
        .details-table td:first-child {
            font-weight: bold;
            color: #333;
            width: 40%;
        }
        .footer {
            margin-top: 32px;
            text-align: right;
            color: #888;
            font-size: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="clinic-info">
                {{ $appointment->medicalFacility->facility_name }}<br>
                {{ $appointment->medicalFacility->address ?? '' }}<br>
                {{ $appointment->medicalFacility->phone ?? '' }}
            </div>
            <div class="title">PHIẾU ĐĂNG KÝ KHÁM BỆNH</div>
            <div class="appointment-code">Mã đơn khám: #{{ $appointment->id }}</div>
        </div>
        <table class="details-table">
            <tr>
                <td>Tên bệnh nhân:</td>
                <td>{{ $appointment->healthProfile->name ?? 'Quý bệnh nhân' }}</td>
            </tr>
            <tr>
                <td>Ngày khám:</td>
                <td>{{ $appointment->date }}</td>
            </tr>
            <tr>
                <td>Giờ khám:</td>
                <td>{{ $appointment->start_time . ' - ' . $appointment->end_time }}</td>
            </tr>
            <tr>
                <td>Bác sĩ phụ trách:</td>
                <td>{{ $appointment->doctor->name }}</td>
            </tr>
            <tr>
                <td>Dịch vụ khám:</td>
                <td>{{ $appointment->medicalService->name }}</td>
            </tr>
        </table>
        <div>
            Vui lòng đến đúng giờ và mang theo giấy tờ tùy thân nếu cần.<br>
            Cảm ơn bạn đã đặt lịch khám bệnh.
        </div>
        <div class="footer">
            Trân trọng,<br>
            <strong>{{ $appointment->medicalFacility->name }}</strong>
        </div>
    </div>
</body>
</html>
