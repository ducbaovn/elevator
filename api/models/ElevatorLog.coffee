module.exports =
  attributes:
    id:
      type: Sequelize.UUID
      primaryKey: true
      defaultValue: Sequelize.UUIDV4

    elevatorId:
      type: Sequelize.STRING
      allowNull: false

    direction:
      type: Sequelize.INTEGER
      defaultValue: 0

    status:
      type: Sequelize.INTEGER
      defaultValue: 0

    level:
      type: Sequelize.INTEGER
      allowNull: false

    people:
      type: Sequelize.INTEGER
      defaultValue: 0

  options:
    freezeTableName: false
    tableName: 'elevator_log'
    classMethods: {}
    instanceMethods: {}