import * as React from 'react';
import '../../Styles/RecruitmentAndHiring.css'
import {Bar} from 'react-chartjs-2';
import {DefaultEffects}from '@fluentui/react'
import {RnHTaskbar} from '../../components/Taskbars/RnHTaskbar'
export const RecruitmentAndHiring: React.FunctionComponent = () => {
    
    const state = {
        labels: ['Data Science', 'Sales', 'Marketing',
                 'BI'],
        datasets: [
          {
            label: 'On-Boarding',
            backgroundColor: '#2832C2',
            borderColor: '#2832C2',
            borderWidth: 2,
            data: [15,14,11,12]
          },
          {
            label: 'Selected',
            backgroundColor: '#016064',
            borderColor: '#016064',
            borderWidth: 2,
            data: [30,25,36,50]
          },
          {
            label: 'Pending',
            backgroundColor: '#241571',
            borderColor: '#241571',
            borderWidth: 2,
            data: [20,30,18,14]
          }
        ]
      }
  return (
      <div style={{marginLeft:10,marginRight:10,marginTop:10,marginBottom:10,boxShadow:DefaultEffects.elevation8}} >
          <RnHTaskbar/>
          <div style={{width:1200}}>
          <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Department Details',
              fontSize:20
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
  
                    }
                }]
              },
            legend:{
              display:true,
              position:'bottom'
            }
          }}
        />
        </div>
        
      </div>

  );
};
