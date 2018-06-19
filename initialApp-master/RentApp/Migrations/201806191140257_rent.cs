namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class rent : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Services", "Deleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.BranchOffices", "Deleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.Comments", "Deleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.Vehicles", "Deleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.VehicleTypes", "Deleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.Reservations", "Deleted", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Reservations", "Deleted");
            DropColumn("dbo.VehicleTypes", "Deleted");
            DropColumn("dbo.Vehicles", "Deleted");
            DropColumn("dbo.Comments", "Deleted");
            DropColumn("dbo.BranchOffices", "Deleted");
            DropColumn("dbo.Services", "Deleted");
        }
    }
}
