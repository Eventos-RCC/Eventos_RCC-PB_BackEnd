import { DataTypes, Model } from "sequelize";

class Ministery extends Model {
    static init(connection) {
        super.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            abbreviation: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: 'ministeries',
            schema: 'rcc',
            underscored: true,
        });
    }

    static associate(models) { 
        this.belongsToMany(models.User, {
            through: 'user_ministeries',
            foreignKey: 'userId',
            as: 'users'
        });
    }
}


export default Ministery;