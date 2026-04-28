import {
    DeleteOutlined,
    FilterFilled,
    FilterOutlined,
} from "@ant-design/icons";
import {
    Badge,
    Button,
    ConfigProvider,
    DatePicker,
    Form,
    Input,
    Popover,
    Segmented,
    Select,
    Switch,
} from "antd";
import { Colors } from "../Themes/Colors";
import dayjs from "dayjs";

function Filter({
    filter,
    defaultFilters,
    filterKeys,
    optionsType,
    datePicker,
    rangeDatePicker,
    handleFilter,
    isMobile,
}) {
    const [form] = Form.useForm();
    const filterValues = Form.useWatch([], form);

    const normalize = (val) => val ?? "";

    const isFiltered = filterKeys.some((key) => {
        return normalize(filter?.[key]) !== normalize(defaultFilters[key]);
    });

    const isFieldActive = (key) => {
        return normalize(filter?.[key]) !== normalize(defaultFilters[key]);
    };

    const activeCount = filterKeys.filter((key) => {
        return normalize(filter?.[key]) !== normalize(defaultFilters[key]);
    }).length;

    const handleFinish = (values) => {
        const payload = {
            ...values,
            ...(values.date && {
                date: values.date.format("YYYY-MM-DD"),
            }),

            ...(values.range && {
                range: [
                    values.range[0].format("YYYY-MM-DD"),
                    values.range[1].format("YYYY-MM-DD"),
                ],
            }),
        };

        handleFilter(payload);
    };

    const handleReset = () => {
        form.resetFields();
        handleFilter();
    };

    const popoverContent = (
        <Form
            form={form}
            layout="inline"
            onFinish={handleFinish}
            initialValues={{
                search: filter?.search,
                type: filter?.type,
                status: filter?.status ?? "active",
                date: filter?.date ? dayjs(filter.date) : null,
                range: filter?.range
                    ? [dayjs(filter.range[0]), dayjs(filter.range[1])]
                    : null,
            }}
            onValuesChange={(changed, all) => {
                if (changed.status === "trash" || changed.search != null) {
                    form.setFieldsValue({ type: "all" });
                }
            }}
            className="flex flex-col gap-2"
        >
            {/* SEARCH */}
            <div>
                <div
                    className={`text-xs mb-1 ${
                        isFieldActive("search")
                            ? "text-blue-500 font-semibold"
                            : "text-gray-500"
                    }`}
                >
                    Search
                </div>

                <Form.Item name="search">
                    <Input placeholder="Search" />
                </Form.Item>
            </div>

            {/* TYPE */}
            {optionsType && (
                <div>
                    <div
                        className={`text-xs mb-1 ${
                            isFieldActive("type")
                                ? "text-blue-500 font-semibold"
                                : "text-gray-500"
                        }`}
                    >
                        Type
                    </div>

                    <Form.Item name="type">
                        {!isMobile ? (
                            <Segmented
                                disabled={filterValues?.status === "trash"}
                                options={optionsType}
                            />
                        ) : (
                            <Select
                                className="min-w-35"
                                disabled={filterValues?.status === "trash"}
                                options={optionsType}
                            />
                        )}
                    </Form.Item>
                </div>
            )}

            {/* DATE */}
            {datePicker && (
                <div>
                    <div
                        className={`text-xs mb-1 ${
                            isFieldActive("date")
                                ? "text-blue-500 font-semibold"
                                : "text-gray-500"
                        }`}
                    >
                        {datePicker.charAt(0).toUpperCase() +
                            datePicker.slice(1)}
                    </div>
                    <Form.Item name="date">
                        <DatePicker picker={datePicker} />
                    </Form.Item>
                </div>
            )}

            {/* RANGE */}
            {rangeDatePicker && (
                <div>
                    <div
                        className={`text-xs mb-1 ${
                            isFieldActive("range")
                                ? "text-blue-500 font-semibold"
                                : "text-gray-500"
                        }`}
                    >
                        Range
                    </div>
                    <Form.Item name="range">
                        <DatePicker.RangePicker />
                    </Form.Item>
                </div>
            )}

            {/* TRASH */}
            <div>
                <div
                    className={`text-xs mb-1 ${
                        isFieldActive("status")
                            ? "text-blue-500 font-semibold"
                            : "text-gray-500"
                    }`}
                >
                    Trash
                </div>

                <ConfigProvider
                    theme={{
                        components: {
                            Switch: {
                                colorPrimary: "#ff4d4f",
                                colorPrimaryHover: "#ff4d4f",
                            },
                        },
                    }}
                >
                    <Form.Item
                        name="status"
                        valuePropName="checked"
                        getValueProps={(value) => ({
                            checked: value === "trash",
                        })}
                        getValueFromEvent={(checked) => {
                            return checked ? "trash" : "active";
                        }}
                    >
                        <Switch
                            checkedChildren={<DeleteOutlined />}
                            unCheckedChildren={<DeleteOutlined />}
                        />
                    </Form.Item>
                </ConfigProvider>
            </div>

            {/* ACTION */}
            <div className="flex justify-end gap-2">
                <Button onClick={handleReset}>Reset</Button>

                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ backgroundColor: Colors.primary }}
                >
                    Apply
                </Button>
            </div>
        </Form>
    );

    return (
        <Popover
            placement="rightTop"
            trigger="click"
            title={"Filter"}
            content={popoverContent}
            style={{ maxWidth: "none", width: "max-content" }}
        >
            <Badge count={activeCount}>
                <Button
                    icon={isFiltered ? <FilterFilled /> : <FilterOutlined />}
                >
                    Filter
                </Button>
            </Badge>
        </Popover>
    );
}

export default Filter;
