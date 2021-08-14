import React from "react";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { IWorkStationUser } from "../../Interfaces";

interface IProps {
  workAreaName: string;
  workStationName: string;
  workStationUsers: IWorkStationUser[];
}
export function WorkStationCard({
  workAreaName,
  workStationUsers,
  workStationName,
}: IProps) {
  return (
    <Card style={{ width: "300px", margin: "20px" }}>
      <CardBody>
        <CardTitle tag="h5">{workAreaName}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          {`Work Station: ${workStationName}`}
        </CardSubtitle>
        <CardText>
          <div>
            {workStationUsers.map((user) => (
              <div key={user.id}>{`${user.firstName} ${user.lastName}`}</div>
            ))}
          </div>
        </CardText>
      </CardBody>
    </Card>
  );
}
