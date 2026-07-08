"use client";
import { useEffect } from "react";
import { socket } from "./socket";
import { employeeApi } from "@/store/employeeApi";
import { useAppDispatch } from "@/hooks/useDispatch";
import { adminApi } from "@/store/admin";
import { employeeProfileApi } from "@/store/employeeProfile";

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      // console.log("Socket Connected", socket.id);
    });
    socket.on("disconnect", () => {
      // console.log("Socket disconnected", socket.id);
    });

    // for add employee
    socket.on("employeeCreated", (employee) => {
      dispatch(
        employeeApi.util.updateQueryData(
          "getAllEmployees",
          undefined,
          (draft) => {
            const exists = draft.some((emp: any) => emp.id === employee.id);

            if (!exists) {
              draft.push(employee);
            }
          },
        ),
      );
    });

    // get Single Employee
    socket.on("getEmployee", (employee) => {
      dispatch(
        employeeApi.util.updateQueryData(
          "getSingleEmployee",
          undefined,
          (draft) => {
            const exists = draft.some((emp: any) => emp.id === employee.id);
            if (!exists) {
              draft.push(employee);
            }
          },
        ),
      );
    });

    // Update Employee
    socket.on("updateEmployee", (employee) => {
      dispatch(
        employeeApi.util.updateQueryData(
          "getAllEmployees",
          undefined,
          (draft) => {
            const emp = draft.find((e: any) => e.id === employee.id);
            if (emp) {
              Object.assign(emp, employee);
            }
          },
        ),
      );
    });

    // delete Employee
    socket.on("deleteEmployee", (deletedId) => {
      dispatch(
        employeeApi.util.updateQueryData(
          "getAllEmployees",
          undefined,
          (draft) => {
            return draft.filter((emp: any) => emp.id !== deletedId);
          },
        ),
      );
    });

    // Change Admin Profile Image 
      // socket.on("changeAdminImage", (profile_image) => {
      //    dispatch(
      //     adminApi.util.updateQueryData(
      //       "AdminProfile",
      //       undefined,
      //       (draft) => {
      //         draft.profile_image = profile_image;
      //       }
      //     )
      //   );
      // });


    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("employeeCreated");
      socket.disconnect();
    };
  }, []);

  return <>{children}</>;
}
