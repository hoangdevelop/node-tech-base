const _ = require('lodash')

const convertUsersDataAdmin = (data, pageIndex, pageSize) => {
  return {
    count: data.count,
    page_index: pageIndex,
    page_size: pageSize,
    data: _.map(data.rows, item => {
      return {
        user_id: item.userId,
        first_name: item.firstName,
        last_name: item.lastName,
        email: item.email,
        role: item.role,
        departments: _.map(item.departments, department => {
          return {
            department_id: department.departmentId,
            role: department.role,
            title: department.department.title
          }
        }),
        teams: _.map(item.teams, team => {
          return {
            team_id: team.teamId,
            role: team.role,
            title: team.team.title
          }
        })
      }
    })
  }
}

module.exports = {
  convertUsersDataAdmin
}
