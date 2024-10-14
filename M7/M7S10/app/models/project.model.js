module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('projects', {
    name: {
    type: DataTypes.STRING
    }
    })
    return Project
}