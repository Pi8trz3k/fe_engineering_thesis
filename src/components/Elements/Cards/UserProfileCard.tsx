import { FrontendUser } from "@/providers/DataTypes/DataProviderTypes.ts";
import { Table, TableColumnsType, Tooltip } from "antd";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  DeleteOutlined,
  StopOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { changeStatus, deleteUser, switchAdmin } from "@/utils/adminUtils.tsx";
import { UseData } from "@/hooks/useData.tsx";

export default function UserProfileCard({ user }: { user: FrontendUser[] }) {
  const { fetchData } = UseData();

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
          <Tooltip
            title={
              record.isMailVerified
                ? "Email potwierdzony"
                : "Email niepotwierdzony"
            }
          >
            {record.isMailVerified ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            ) : (
              <CloseCircleTwoTone twoToneColor="#ff4d4f" />
            )}
          </Tooltip>
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
      render: (_, record) => (
        <div>
          {record.isAdmin ? (
            <span>Administrator</span>
          ) : record.type === "trainer" ? (
            <span>Trener</span>
          ) : (
            <span>Użytkownik</span>
          )}
        </div>
      ),
      filters: [
        { text: "Administrator", value: "administrator" },
        { text: "Użytkownik", value: "user" },
        { text: "Trener", value: "trainer" },
      ],
    },
    {
      title: "Zarządzaj",
      key: "actions",
      render: (_, record) => (
        <span className="flex items-center gap-2">
          <Tooltip title={"Usuń użytkownika"}>
            <DeleteOutlined
              style={{ color: "red" }}
              onClick={() => deleteUser(record.userID, fetchData)}
            />
          </Tooltip>

          <Tooltip
            title={
              record.status === "blocked"
                ? "Odblokuj użytkownika"
                : record.status === "active"
                  ? "Zablokuj użytkownika"
                  : "Aktywuj użytkownika"
            }
          >
            <StopOutlined
              style={{
                color:
                  record.status === "blocked"
                    ? "red"
                    : record.status === "active"
                      ? "green"
                      : "grey",
              }}
              onClick={() => {
                if (record.status === "active") {
                  changeStatus(record.userID, "blocked", fetchData);
                } else {
                  // user blocked or not active
                  changeStatus(record.userID, "active", fetchData);
                }
              }}
            />
          </Tooltip>

          <Tooltip
            title={
              record.isAdmin
                ? "Odbierz uprawnienia admina"
                : "Nadaj uprawnienia admina"
            }
          >
            <UserSwitchOutlined
              style={{ color: record.isAdmin ? "green" : "red" }}
              onClick={() => {
                switchAdmin(record.userID, fetchData);
              }}
            />
          </Tooltip>
        </span>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <Table
        dataSource={user}
        columns={columns}
        rowKey="userID"
        pagination={{
          pageSize: 15,
          position: ["bottomCenter"],
        }}
        scroll={{ x: true }}
      />
    </div>
  );
}
