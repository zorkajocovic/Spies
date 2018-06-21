namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class rentt : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Vehicles", "PriceVehicle", c => c.Single(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Vehicles", "PriceVehicle");
        }
    }
}
