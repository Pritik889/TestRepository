import * as React from 'react';
import '../../Styles/Dashboard.css'
import { Stack, PrimaryButton } from 'office-ui-fabric-react';
import { Link } from 'react-router-dom';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { DefaultEffects } from '@fluentui/react';
import { initializeIcons } from 'office-ui-fabric-react/lib';
import employee from '../../logo/employee.png';
import hiring from '../../logo/hiring.png';
import learning from '../../logo/learning.png';
import time from '../../logo/time.png';
import benefit from '../../logo/benefit.png';
import finance from '../../logo/finance.png';
import talent from'../../logo/talent.png';



const overflowProps: IButtonProps = { ariaLabel: 'More commands' };
const _overflowItems: ICommandBarItemProps[] = [
  { key: 'Managers', text: 'Managers', onClick: () => console.log('Managers') },
  { key: 'TeamMembers', text: 'Team Members', onClick: () => console.log('Team Members')},
  { key: 'HRDepartment', text: 'HR Department', onClick: () => console.log('Rename')},
  { key: 'AccountsDepartment', text: 'Accounts Department', onClick: () => console.log('Accounts Department')},

];

initializeIcons();
const _items: ICommandBarItemProps[] = [];
export const Dashboard: React.FunctionComponent = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [isHorizontal, setIsHorizontal] = React.useState(true);
  const updateWidth = () => {
    setWidth(window.innerWidth);
  };
  React.useEffect(() => {
    window.addEventListener("resize", updateWidth);
    if (width < 700)
      setIsHorizontal(false);
    else
      setIsHorizontal(true)
    return () => window.removeEventListener("resize", updateWidth);
  });
  return (
    <div className="contentBox">
      <h1 style={{ marginLeft: 40 }} >Dashboard</h1>
      <div className="allcard">
        <Stack horizontal={isHorizontal}>
          <Link to="/RecruitmentAndHiring" >
            <PrimaryButton className="primaryBtn" style={{ fontSize: 20, boxShadow: DefaultEffects.elevation16, marginLeft: 30, color: "black", borderColor: "lightgray", backgroundColor: "white", width: 320, height: 170 }}>
              <CommandBar items={_items} className="dropdown" overflowItems={_overflowItems} />
              <Stack horizontal tokens={{ childrenGap: 10 }}>
                <img src={hiring} alt="hiring" className="iconclass" />
                <p className="boxText"> Recruitment<br></br>& Hiring </p>
              </Stack>
            </PrimaryButton>
          </Link>

          <Link to="/" >
            <PrimaryButton className="primaryBtn" style={{ fontSize: 20, boxShadow: DefaultEffects.elevation16, marginLeft: 30, color: "black", borderColor: "lightgray", backgroundColor: "white", width: 320, height: 170 }}>
              <CommandBar items={_items} className="dropdown" overflowItems={_overflowItems} />
              <Stack horizontal tokens={{ childrenGap: 10 }}>
                <img src={employee} alt="employee" className="iconclass" />
                <p className="boxText">Employee<br></br>Information</p>
              </Stack>
            </PrimaryButton>
          </Link>
          <Link to="/" >
            <PrimaryButton className="primaryBtn" style={{ fontSize: 20, boxShadow: DefaultEffects.elevation16, marginLeft: 30, color: "black", borderColor: "lightgray", backgroundColor: "white", width: 320, height: 170 }}>
              <CommandBar items={_items} className="dropdown" overflowItems={_overflowItems} />
              <Stack horizontal tokens={{ childrenGap: 10 }}>

                <img src={benefit} alt="benefit" className="iconclass" />
                <p className="boxText">Benefit<br></br>Management</p>
              </Stack>
            </PrimaryButton>
          </Link>

        </Stack>
        <br></br>
        <Stack horizontal={isHorizontal}>

          <Link to="/" >
            <PrimaryButton className="primaryBtn" style={{ fontSize: 20, boxShadow: DefaultEffects.elevation16, marginLeft: 30, color: "black", borderColor: "lightgray", backgroundColor: "white", width: 320, height: 170 }}>
              <CommandBar items={_items} className="dropdown" overflowItems={_overflowItems} />
              <Stack horizontal tokens={{ childrenGap: 10 }}>
                <img src={talent} alt="talent" className="iconclass" />
                <p className="boxText">Talent<br></br>Management</p>
              </Stack>
            </PrimaryButton></Link>

          <Link to="/" >
            <PrimaryButton className="primaryBtn" style={{ fontSize: 20, boxShadow: DefaultEffects.elevation16, marginLeft: 30, color: "black", borderColor: "lightgray", backgroundColor: "white", width: 320, height: 170 }}>
              <CommandBar items={_items} className="dropdown" overflowItems={_overflowItems} />
              <Stack horizontal tokens={{ childrenGap: 10 }}>
                <img src={time} alt="time" className="iconclass" />
                <p className="boxText">Time<br></br>Management</p>
              </Stack>
            </PrimaryButton> </Link>
          <Link to="/" >
            <PrimaryButton className="primaryBtn" style={{ fontSize: 20, boxShadow: DefaultEffects.elevation16, marginLeft: 30, color: "black", borderColor: "lightgray", backgroundColor: "white", width: 320, height: 170 }}>
              <CommandBar items={_items} className="dropdown" overflowItems={_overflowItems} />
              <Stack horizontal tokens={{ childrenGap: 10 }}>
                <img src={learning} alt="learning" className="iconclass" />
                <p className="boxText">Learning<br></br>& development</p>
              </Stack>
            </PrimaryButton> </Link>
        </Stack>
        <br></br>
        <Stack horizontal={isHorizontal}>

          <Link to="/" >
            <PrimaryButton className="primaryBtn" style={{ fontSize: 20, boxShadow: DefaultEffects.elevation16, marginLeft: 30, color: "black", borderColor: "lightgray", backgroundColor: "white", width: 320, height: 170 }}>
              <CommandBar items={_items} className="dropdown" overflowItems={_overflowItems} />
              <Stack horizontal tokens={{ childrenGap: 10 }}>
                <img src={finance} alt="finance" className="iconclass" />
                <p className="boxText">Financial<br></br>Management</p>
              </Stack>
            </PrimaryButton></Link>
        </Stack>
      </div>
    </div>

  );
};