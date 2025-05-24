import { FrontendUser } from "@/providers/DataTypes/DataProviderTypes.ts";
import { Table, TableColumnsType } from "antd";

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
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Telefon",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Weryfikacja email",
    dataIndex: "isMailVerified",
    key: "isMailVerified",
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
