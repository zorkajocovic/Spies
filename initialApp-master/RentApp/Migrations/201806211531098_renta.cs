namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class renta : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BranchOffices",
                c => new
                    {
                        BranchOfficeID = c.Int(nullable: false, identity: true),
                        Address = c.String(nullable: false),
                        Latitude = c.Single(nullable: false),
                        Longitude = c.Single(nullable: false),
                        Image = c.String(nullable: false),
                        ServiceID = c.Int(nullable: false),
                        CreatorID = c.Int(nullable: false),
                        Deleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.BranchOfficeID)
                .ForeignKey("dbo.AppUsers", t => t.CreatorID, cascadeDelete: false)
                .ForeignKey("dbo.Services", t => t.ServiceID, cascadeDelete: false)
                .Index(t => t.ServiceID)
                .Index(t => t.CreatorID);
            
            CreateTable(
                "dbo.Comments",
                c => new
                    {
                        CommentID = c.Int(nullable: false, identity: true),
                        ClientID = c.Int(nullable: false),
                        ServiceID = c.Int(nullable: false),
                        Text = c.String(),
                        Deleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.CommentID)
                .ForeignKey("dbo.AppUsers", t => t.ClientID, cascadeDelete: false)
                .ForeignKey("dbo.Services", t => t.ServiceID, cascadeDelete: false)
                .Index(t => t.ClientID)
                .Index(t => t.ServiceID);
            
            CreateTable(
                "dbo.Rates",
                c => new
                    {
                        RateID = c.Int(nullable: false, identity: true),
                        ClientID = c.Int(nullable: false),
                        ServiceID = c.Int(nullable: false),
                        Value = c.Decimal(nullable: false, precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.RateID)
                .ForeignKey("dbo.AppUsers", t => t.ClientID, cascadeDelete: false)
                .ForeignKey("dbo.Services", t => t.ServiceID, cascadeDelete: false)
                .Index(t => t.ClientID)
                .Index(t => t.ServiceID);
            
            CreateTable(
                "dbo.Items",
                c => new
                    {
                        ItemID = c.Int(nullable: false, identity: true),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        VehicleID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ItemID)
                .ForeignKey("dbo.Vehicles", t => t.VehicleID, cascadeDelete: false)
                .Index(t => t.VehicleID);
            
            CreateTable(
                "dbo.Vehicles",
                c => new
                    {
                        VehicleID = c.Int(nullable: false, identity: true),
                        VehicleTypeId = c.Int(nullable: false),
                        ServiceId = c.Int(nullable: false),
                        Model = c.String(nullable: false),
                        Producer = c.String(nullable: false),
                        ProductionYear = c.Int(nullable: false),
                        Description = c.String(),
                        Image = c.String(nullable: false),
                        Available = c.Boolean(nullable: false),
                        CreatorID = c.Int(nullable: false),
                        Deleted = c.Boolean(nullable: false),
                        PriceVehicle = c.Single(nullable: false),
                    })
                .PrimaryKey(t => t.VehicleID)
                .ForeignKey("dbo.AppUsers", t => t.CreatorID, cascadeDelete: false)
                .ForeignKey("dbo.Services", t => t.ServiceId, cascadeDelete: false)
                .ForeignKey("dbo.VehicleTypes", t => t.VehicleTypeId, cascadeDelete: false)
                .Index(t => t.VehicleTypeId)
                .Index(t => t.ServiceId)
                .Index(t => t.CreatorID);
            
            CreateTable(
                "dbo.VehicleTypes",
                c => new
                    {
                        VehicleTypeId = c.Int(nullable: false, identity: true),
                        VehicleName = c.String(nullable: false),
                        Deleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.VehicleTypeId);
            
            CreateTable(
                "dbo.Reservations",
                c => new
                    {
                        ReservationID = c.Int(nullable: false, identity: true),
                        ClientID = c.Int(nullable: false),
                        VehicleID = c.Int(nullable: false),
                        GetVehicleDate = c.DateTime(nullable: false),
                        ReturnVehicleDate = c.DateTime(nullable: false),
                        GetBranchId = c.Int(nullable: false),
                        ReturnBranchId = c.Int(nullable: false),
                        Deleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ReservationID)
                .ForeignKey("dbo.BranchOffices", t => t.GetBranchId, cascadeDelete: false)
                .ForeignKey("dbo.AppUsers", t => t.ClientID, cascadeDelete: false)
                .ForeignKey("dbo.Vehicles", t => t.VehicleID, cascadeDelete: false)
                .Index(t => t.ClientID)
                .Index(t => t.VehicleID)
                .Index(t => t.GetBranchId);
            
            AddColumn("dbo.AppUsers", "DateOfBirth", c => c.DateTime(nullable: false));
            AddColumn("dbo.AppUsers", "Image", c => c.String());
            AddColumn("dbo.Services", "Logo", c => c.String(nullable: false));
            AddColumn("dbo.Services", "Email", c => c.String(nullable: false));
            AddColumn("dbo.Services", "Description", c => c.String());
            AddColumn("dbo.Services", "Approved", c => c.Boolean(nullable: false));
            AddColumn("dbo.Services", "CreatorID", c => c.Int(nullable: false));
            AddColumn("dbo.Services", "Deleted", c => c.Boolean(nullable: false));
            AlterColumn("dbo.AppUsers", "FullName", c => c.String(nullable: false));
            AlterColumn("dbo.Services", "Name", c => c.String(nullable: false));
            CreateIndex("dbo.Services", "CreatorID");
            AddForeignKey("dbo.Services", "CreatorID", "dbo.AppUsers", "Id", cascadeDelete: false);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Reservations", "VehicleID", "dbo.Vehicles");
            DropForeignKey("dbo.Reservations", "ClientID", "dbo.AppUsers");
            DropForeignKey("dbo.Reservations", "GetBranchId", "dbo.BranchOffices");
            DropForeignKey("dbo.Items", "VehicleID", "dbo.Vehicles");
            DropForeignKey("dbo.Vehicles", "VehicleTypeId", "dbo.VehicleTypes");
            DropForeignKey("dbo.Vehicles", "ServiceId", "dbo.Services");
            DropForeignKey("dbo.Vehicles", "CreatorID", "dbo.AppUsers");
            DropForeignKey("dbo.Rates", "ServiceID", "dbo.Services");
            DropForeignKey("dbo.Rates", "ClientID", "dbo.AppUsers");
            DropForeignKey("dbo.Services", "CreatorID", "dbo.AppUsers");
            DropForeignKey("dbo.Comments", "ServiceID", "dbo.Services");
            DropForeignKey("dbo.Comments", "ClientID", "dbo.AppUsers");
            DropForeignKey("dbo.BranchOffices", "ServiceID", "dbo.Services");
            DropForeignKey("dbo.BranchOffices", "CreatorID", "dbo.AppUsers");
            DropIndex("dbo.Reservations", new[] { "GetBranchId" });
            DropIndex("dbo.Reservations", new[] { "VehicleID" });
            DropIndex("dbo.Reservations", new[] { "ClientID" });
            DropIndex("dbo.Vehicles", new[] { "CreatorID" });
            DropIndex("dbo.Vehicles", new[] { "ServiceId" });
            DropIndex("dbo.Vehicles", new[] { "VehicleTypeId" });
            DropIndex("dbo.Items", new[] { "VehicleID" });
            DropIndex("dbo.Rates", new[] { "ServiceID" });
            DropIndex("dbo.Rates", new[] { "ClientID" });
            DropIndex("dbo.Comments", new[] { "ServiceID" });
            DropIndex("dbo.Comments", new[] { "ClientID" });
            DropIndex("dbo.BranchOffices", new[] { "CreatorID" });
            DropIndex("dbo.BranchOffices", new[] { "ServiceID" });
            DropIndex("dbo.Services", new[] { "CreatorID" });
            AlterColumn("dbo.Services", "Name", c => c.String());
            AlterColumn("dbo.AppUsers", "FullName", c => c.String());
            DropColumn("dbo.Services", "Deleted");
            DropColumn("dbo.Services", "CreatorID");
            DropColumn("dbo.Services", "Approved");
            DropColumn("dbo.Services", "Description");
            DropColumn("dbo.Services", "Email");
            DropColumn("dbo.Services", "Logo");
            DropColumn("dbo.AppUsers", "Image");
            DropColumn("dbo.AppUsers", "DateOfBirth");
            DropTable("dbo.Reservations");
            DropTable("dbo.VehicleTypes");
            DropTable("dbo.Vehicles");
            DropTable("dbo.Items");
            DropTable("dbo.Rates");
            DropTable("dbo.Comments");
            DropTable("dbo.BranchOffices");
        }
    }
}
