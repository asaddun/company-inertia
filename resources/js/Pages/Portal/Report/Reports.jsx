import { Button, Popconfirm, Space, Table, Tooltip, Typography } from "antd";
import { Colors } from "../../../Themes/Colors";
import {
    CheckCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    PlusOutlined,
    RedoOutlined,
} from "@ant-design/icons";
import { useApp } from "../../../Context/AppContext";
import { Link, router } from "@inertiajs/react";
import Filter from "../../../Components/Filter";
import ReportsTable from "../../../Components/ReportsTable";

const { Title } = Typography;

function Reports({ reports, context, filter, defaultFilters, filterKeys }) {
    const { isMobile } = useApp();
    const isTrash = filter.status === "trash";

    const handleFilter = (values) => {
        router.get(route(`reports.${context}`), values);
    };

    const handlePagination = (pagination) => {
        router.get(route(`reports.${context}`), {
            ...filter,
            page: pagination.current,
            per_page: pagination.pageSize,
        });
    };

    return (
        <>
            <Title level={3}>
                {`${context.charAt(0).toUpperCase() + context.slice(1)} Reports`}
            </Title>
            <div className="flex justify-between py-2">
                <div>
                    <Filter
                        filter={filter}
                        defaultFilters={defaultFilters}
                        filterKeys={filterKeys}
                        datePicker={"date"}
                        rangeDatePicker={true}
                        handleFilter={handleFilter}
                        isMobile={isMobile}
                    />
                </div>
                <div>
                    {context == "my" && (
                        <Link href={route("reports.create")}>
                            <Button
                                variant="solid"
                                style={{
                                    backgroundColor: Colors.primary,
                                    color: "#FFF",
                                }}
                                icon={<PlusOutlined />}
                            >
                                Create
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

            <ReportsTable
                data={reports.data}
                isTrash={isTrash}
                isMobile={isMobile}
                handlePagination={handlePagination}
            />
        </>
    );
}

export default Reports;
