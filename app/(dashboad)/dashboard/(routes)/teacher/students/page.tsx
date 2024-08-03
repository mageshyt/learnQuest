import { auth } from "@clerk/nextjs/server";
import Heading from "@/components/global/heading";
import { redirect } from "next/navigation";
import { db } from "@/lib";
import { DashboardCardWrapper } from "@/components/global/dashboard-card-wrapper";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";

const StudentsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  // get the  purchased courses of the user

  const users = await db.course.findMany({
    where: {
      userId,
    },
    select: {
      purchase: {
        select: {
          user: true,
          course: true,
        },
      },
    },
  });
  const filteredPurchase = users.flatMap((purchase) => purchase.purchase);

  const filteredUsers = filteredPurchase.map((purchase) => purchase.user);

  // console.log(filteredPurchase);

  return (
    <div className="p-4">
      <Heading
        title="Students"
        description="Manage your students here"
        isUnderlined={false}
      />
      <DashboardCardWrapper title="Students">
        <DataTable
          data={filteredPurchase}
          columns={columns}
          searchKey="username"
        />
      </DashboardCardWrapper>
    </div>
  );
};

export default StudentsPage;
