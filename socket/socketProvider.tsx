"use client";
import { useEffect } from "react";
import { socket } from "./socket";
import { employeeApi } from "@/store/employeeApi";
import { useAppDispatch } from "@/hooks/useDispatch";
import { notificationApi } from "@/store/notifications";
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
      (draft: any) => {
        const emp = draft.find(
          (e: any) => e.id === employee.id
        );
        if (emp) {
          Object.assign(emp, employee);
        }
      }
    )
  );
  dispatch(
    employeeApi.util.updateQueryData(
      "employeeRequest",
      undefined,
      (draft: any) => {
        if (!draft?.data) return;

        if (draft.data.id === employee.id) {
          Object.assign(draft.data, employee);
        }
   }))});

    // delete Employee By admin
    socket.on("deleteEmployee", (deletedId) => {
    dispatch(
      employeeApi.util.updateQueryData(
        "getAllEmployees",
        undefined,
        (draft: any) => {
          return draft.filter(
            (emp: any) => emp.id !== deletedId
          );
        }
      )
    );
    dispatch(
      employeeApi.util.updateQueryData(
        "employeeRequest",
        undefined,
        (draft: any) => {
          if (!draft?.data) return;

          if (draft.data.id === deletedId) {
            draft.data = null;
          }
        }
      )
    );
    dispatch(
      notificationApi.util.updateQueryData(
        "getNotifications",
        undefined,
        (draft: any) => {
          return draft.filter(
            (notification: any) =>
              notification.employee_id !== deletedId
          );
        }
      )
    );

});

    // ***************** For Employe Requests APIs ***********************

    socket.on("reqEmployee", ({ employee, notification}) => {     
      const updateNotificationCache = (notification: any) => (draft: any) => {
        if (!draft) return;
        const exists = draft.some(
          (notify: any) => notify.id === notification.id,
        );
        if (!exists) {
          draft.unshift(notification);
        }
      };

      dispatch(
        notificationApi.util.updateQueryData(
          "getNotifications",
          undefined,
          updateNotificationCache(notification),
        ),
      );

      const updateEmployeeCache = (employee : any) => (draft: any) => {
        draft.data = employee
      };
      dispatch(
        employeeApi.util.updateQueryData(
          "employeeRequest",
          undefined,
          updateEmployeeCache(employee)
        ),
      );


 
    });

    // approve notifications
    socket.on("approveNotif", ({ employee, notificationId }) => {
      dispatch(
        employeeApi.util.updateQueryData(
          "getAllEmployees",
          undefined,
          (draft: any) => {
            if (!draft) return;

            const emp = draft.find((e: any) => e.id === employee.id);

            if (emp) {
              Object.assign(emp, employee);
            } else {
              draft.push(employee);
            }
          },
        ),
      );

      dispatch(
        employeeApi.util.updateQueryData(
          "employeeRequest",
          undefined,
          (draft: any) => {
            if (!draft?.data) return;

            Object.assign(draft.data, employee);
          },
        ),
      );

      dispatch(
        notificationApi.util.updateQueryData(
          "getNotifications",
          undefined,
          (draft: any) => {
            if (!draft) return;
            const notify = draft.find((n: any) => n.id === notificationId);
            if (notify) {
              notify.status = "accept";
            }
          },
        ),
      );
    });


  // reject notification
  socket.on("rejectNotif", ({ employee, notificationId }) => {
  dispatch(
  employeeApi.util.updateQueryData(
    "getAllEmployees",
    undefined,
    (draft: any) => {
      if (!draft) return;

      const index = draft.findIndex(
        (e: any) => e.id === employee.id
      );

      if (index !== -1) {
        draft.splice(index, 1);
      }
    }
  )
);

  dispatch(
    employeeApi.util.updateQueryData(
      "employeeRequest",
      undefined,
      (draft: any) => {
        if (!draft?.data) return;

        Object.assign(draft.data, employee);
      }
    )
  );

  dispatch(
    notificationApi.util.updateQueryData(
      "getNotifications",
      undefined,
      (draft: any) => {
        if (!draft) return;

        const notify = draft.find(
          (n: any) => n.id === notificationId
        );

        if (notify) {
          notify.status = "reject"; 
        }
      }
    )
  );

});

// *************************** Profile ******************************

// update Admin Profile Page 
  socket.on("chngAdminProfileImage", (profile_image) => {
  dispatch(
    adminApi.util.updateQueryData(
      "AdminProfile",
      undefined,
      (draft: any) => {
        if (!draft?.data) return;

        draft.data.profile_image = profile_image;
      }
    )
  );
});


// update employee Profile Page 
 socket.on("chngEmpProfileImage", (profile_image) => {
  dispatch(
    employeeProfileApi.util.updateQueryData(
      "employeeProfile",
      undefined,
      (draft: any) => {
        if (!draft?.data) return;
        draft.data.profile_image = profile_image;
      }
    )
  );
});



  



    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("employeeCreated");
      socket.disconnect();
    };
  }, []);

  return <>{children}</>;
}
