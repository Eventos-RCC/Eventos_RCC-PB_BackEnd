import { DataTypes, Model } from 'sequelize';

class PrayerGroup extends Model { 
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            year_of_creation: DataTypes.DATEONLY,
            inUnity: DataTypes.BOOLEAN,
            status: {
                type: DataTypes.ENUM('active', 'inactive'),
                defaultValue: 'active',
            },
        }, {
            sequelize: connection,
            tableName: 'prayer_groups',
            schema: 'rcc',
            underscored: true,
        });
    }

    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: 'cordinator_id',
            as: 'cordinator_user'
        });
        this.belongsTo(models.Diocese, {
            foreignKey: 'diocese_id',
            as: 'diocese_info'
        });
        this.belongsTo(models.Adress, {
            foreignKey: 'adress',
            as: 'adress_info'
        });
    }
}

export default PrayerGroup;