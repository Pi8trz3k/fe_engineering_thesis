import { FrontendUser } from "@/providers/DataTypes/DataProviderTypes.ts";
import { Table, TableColumnsType } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";

const columns: TableColumnsType<FrontendUser> = [
  {
    title: "ID",
    dataIndex: "userID",
    key: "userID",
    defaultSortOrder: "ascend",
    sorter: (a, b) => a.userID - b.userID,
  },
  {
    title: "Imię i nazwisko",
    key: "fullName",
    render: (_, record) => `${record.name} ${record.lastName}`,
    sorter: (a, b) => {
      const fullNameA = `${a.name} ${a.lastName}`.toLowerCase();
      const fullNameB = `${b.name} ${b.lastName}`.toLowerCase();
      return fullNameA.localeCompare(fullNameB);
    },
  },
  {
    title: "Email (weryfikacja)",
    render: (_, record) => (
      <div className="flex items-center gap-2">
        <span>{record.email}</span>
        {record.isMailVerified ? (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        ) : (
          <CloseCircleTwoTone twoToneColor="#ff4d4f" />
        )}
      </div>
    ),
    filters: [
      { text: "Potwierdzony", value: true },
      { text: "Niepotwierdzony", value: false },
    ],
    onFilter: (_, record) => record.isMailVerified === _,
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Telefon",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Typ konta",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Uprawnienia admina",
    dataIndex: "isAdmin",
    key: "isAdmin",
  },
];

export default function UserProfileCard({ user }: { user: FrontendUser[] }) {
  return (
    <>
      <Table
        dataSource={user}
        columns={columns}
        rowKey="userID"
        pagination={{
          pageSize: 15,
          position: ["bottomCenter"],
        }}
      />
    </>
  );
}
