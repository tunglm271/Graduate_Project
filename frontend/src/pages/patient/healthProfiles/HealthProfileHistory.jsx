import React, { useState } from 'react';
import HealthExamatitonRecord from '../../../components/HealthExamatitonRecord';
import { Timeline, TimelineItem, TimelineSeparator , TimelineConnector , TimelineContent , TimelineDot, timelineItemClasses   } from '@mui/lab';

const healthExaminationRecord =  [
    {
        id: 1,
        date: '2021-10-10',
        service: 'Khám tổng quát',
        doctor: 'Nguyen Van A',
        hospital: 'Bệnh viện Bạch Mai',
        examationReason: 'Thấy đau họng',
        diagnosis: 'Viêm họng cấp tính do vi khuẩn, cần theo dõi và điều trị bằng kháng sinh trong 7 ngày. Bệnh nhân cần nghỉ ngơi, uống nhiều nước và tránh tiếp xúc với các tác nhân gây kích ứng họng.',
        prescription: 'Paracetamol 500mg',
        MedicalTest: [
            {
                name: 'Xét nghiệm máu',
                result: 'Bình thường'
            },
            {
                name: 'Xét nghiệm nước tiểu',
                result: 'Bình thường'
            }
        ],
    },
    {
        id: 1,
        date: '2021-10-10',
        service: 'Khám tổng quát',
        doctor: 'Nguyen Van A',
        hospital: 'Bệnh viện Bạch Mai',
        examationReason: 'Thấy đau họng',
        diagnosis: 'Viêm họng cấp tính do vi khuẩn, cần theo dõi và điều trị bằng kháng sinh trong 7 ngày. Bệnh nhân cần nghỉ ngơi, uống nhiều nước và tránh tiếp xúc với các tác nhân gây kích ứng họng.',
        prescription: 'Paracetamol 500mg',
        MedicalTest: [
            {
                name: 'Xét nghiệm máu',
                result: 'Bình thường'
            },
            {
                name: 'Xét nghiệm nước tiểu',
                result: 'Bình thường'
            }
        ],
    },
    {
        id: 1,
        date: '2021-10-10',
        service: 'Khám tổng quát',
        doctor: 'Nguyen Van A',
        hospital: 'Bệnh viện Bạch Mai',
        examationReason: 'Thấy đau họng',
        diagnosis: 'Viêm họng cấp tính do vi khuẩn, cần theo dõi và điều trị bằng kháng sinh trong 7 ngày. Bệnh nhân cần nghỉ ngơi, uống nhiều nước và tránh tiếp xúc với các tác nhân gây kích ứng họng.',
        prescription: 'Paracetamol 500mg',
        MedicalTest: [
            {
                name: 'Xét nghiệm máu',
                result: 'Bình thường'
            },
            {
                name: 'Xét nghiệm nước tiểu',
                result: 'Bình thường'
            }
        ],
    },
]

const HealthProfileHistory = () => {
    const [currentFilter, setCurrentFilter] = useState('all');

    return (
        <div className='health-profile-history'>
            <div className='record-list'>
                <Timeline
                    position="right"
                    sx={{
                        [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0,
                        },
                    }}
                >
                    {
                        healthExaminationRecord.concat(HealthExamatitonRecord).map((record, index) => (
                            <React.Fragment key={index}>
                                <TimelineItem>
                                    <TimelineSeparator>
                                        <TimelineDot />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <HealthExamatitonRecord record={record} />
                                    </TimelineContent>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineSeparator>
                                        <TimelineDot />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <HealthExamatitonRecord record={record} />
                                    </TimelineContent>
                                </TimelineItem>
                            </React.Fragment>
                        ))
                    }
                </Timeline>
            </div>
            <div className='record-filter'>
                <button 
                    className={currentFilter === "all" ? "filter-active" : ""}
                    onClick={() => setCurrentFilter('all')}
                >
                    Tất cả
                </button>
                <button
                    className={currentFilter === "month" ? "filter-active" : ""}
                    onClick={() => setCurrentFilter('month')}
                >
                    Trong tháng
                </button>
                <button
                    className={currentFilter === "week" ? "filter-active" : ""}
                    onClick={() => setCurrentFilter('week')}
                >
                    Trong tuần
                </button>
            </div>
        </div>
    );
}

export default HealthProfileHistory;
