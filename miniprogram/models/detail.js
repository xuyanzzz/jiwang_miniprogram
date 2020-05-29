import{
  formatDate,
  formatDateTime,
  formatDuration,
  formatDurationToStr
}
from '../utils/dataTimeUtil'
export default class DetailModel{
  static getGoalData(goalId){
    return wx.cloud.callFunction({
      name:'getGoalData',
      data:{goalID}
    })
  }
  static removeGoal(goalId){
    return wx.cloud.callFunction({
      name:'removeGoal',
      data:{goalId}
    })
  }
  static formatGoalData(data){
    const goalInfo=data.goalInfo.data
    const goalRecords=data.goalRecords.data[0].records
    return{
      title:goalInfo.title,
      duration:formatDurationToStr(goalInfo.time),
      lastUpdate:formatDate(goalInfo.lastUpdate),
      goalRecords:this.formatGoalRecords(goalRecords),
      longestDuration:this.pickLongestDuration(goalRecords)
    }
  }
  static formatGoalRecords(goalRecords){
    if(!goalRecords) return []
    return goalRecords.map(record=>({
      duration:formatDuration(record.time),
      data:`${formatDataTime(record.beginData)}~${formatDataTime(record.endData)}`,
      summary:record.summary
    }))
  }
  static pickLongestDuration(goalRecords){
    if(!goalRecords) return formatDurationToStr(0)
    let max=0
    goalRecords.forEach(record=>{
      const duration =+record.time
      max=duration>max?duration:max
    })
    return formatDurationToStr(max)
  }

  static editGoalTitle(goalId,goalTitle){
    return wx.cloud.callFunction({
      name:'editGoalTitle',
      data:{
        goalId,
        goalTitle
      }
    })
  }
}