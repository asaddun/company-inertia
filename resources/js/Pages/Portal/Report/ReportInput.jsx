import { useEffect, useState } from "react";
import { DatePicker, Select, Typography, Button, Skeleton } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Colors } from "../../../Themes/Colors";
import { useApp } from "../../../Context/AppContext";
import { Link } from "@inertiajs/react";
import FormReport from "../../../Components/Form/FormReport";

const { Title } = Typography;

function ReportInput({ report, context, types, jobFields }) {
    const isEdit = report ? true : false;
    const [selectedType, setSelectedType] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const { isMobile } = useApp();

    useEffect(() => {
        if (!selectedDate) {
            setSelectedType(null);
        }
    }, [selectedDate]);

    useEffect(() => {
        if (report) {
            setSelectedDate(dayjs(report.work_date));
            setSelectedType(report.job_type_id);
        }
    }, []);

    return (
        <>
            <Title level={3}>{isEdit ? "Edit" : "Create"} Work Reports</Title>
            <div className="flex justify-between py-2">
                <div>
                    <Button
                        icon={<ArrowLeftOutlined />}
                        style={{
                            backgroundColor: Colors.primary,
                            color: "white",
                        }}
                        onClick={() => window.history.back()}
                    >
                        Back
                    </Button>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <div className="flex flex-row gap-4">
                    <DatePicker
                        onChange={(date) => setSelectedDate(date)}
                        maxDate={dayjs()}
                        value={selectedDate}
                        disabled={isEdit}
                    />
                    <Select
                        style={{ width: "auto", minWidth: 150 }}
                        placeholder="-- Select --"
                        value={selectedType}
                        onChange={(value) => setSelectedType(value)}
                        disabled={!selectedDate || isEdit}
                        options={types.map((opt) => ({
                            label: opt.name,
                            value: opt.id,
                        }))}
                    />
                </div>
            </div>

            <br />
            <hr />
            <br />

            <div className="flex justify-center">
                <div style={{ width: isMobile ? "100%" : "50%" }}>
                    {selectedType && (
                        <FormReport
                            selectedDate={selectedDate}
                            types={types}
                            selectedType={selectedType}
                            jobFields={jobFields}
                            report={report}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default ReportInput;
