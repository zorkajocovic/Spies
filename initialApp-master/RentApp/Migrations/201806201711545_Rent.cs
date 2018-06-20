namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Rent : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Items", "PriceListId_PriceListID", "dbo.PriceLists");
            DropForeignKey("dbo.PriceLists", "Item_ItemID", "dbo.Items");
            DropIndex("dbo.Items", new[] { "PriceListId_PriceListID" });
            DropIndex("dbo.PriceLists", new[] { "Item_ItemID" });
            AddColumn("dbo.Services", "Deleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.BranchOffices", "CreatorID", c => c.Int(nullable: false));
            AddColumn("dbo.BranchOffices", "Deleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.Comments", "Deleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.Vehicles", "Deleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.VehicleTypes", "Deleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.Reservations", "Deleted", c => c.Boolean(nullable: false));
            AlterColumn("dbo.BranchOffices", "Latitude", c => c.Single(nullable: false));
            AlterColumn("dbo.BranchOffices", "Longitude", c => c.Single(nullable: false));
            CreateIndex("dbo.BranchOffices", "CreatorID");
            AddForeignKey("dbo.BranchOffices", "CreatorID", "dbo.AppUsers", "Id", cascadeDelete: true);
            DropColumn("dbo.Items", "PriceListID");
            DropColumn("dbo.Items", "PriceListId_PriceListID");
            DropTable("dbo.PriceLists");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.PriceLists",
                c => new
                    {
                        PriceListID = c.Int(nullable: false, identity: true),
                        FromHour = c.Int(nullable: false),
                        ToHour = c.Int(nullable: false),
                        Item_ItemID = c.Int(),
                    })
                .PrimaryKey(t => t.PriceListID);
            
            AddColumn("dbo.Items", "PriceListId_PriceListID", c => c.Int());
            AddColumn("dbo.Items", "PriceListID", c => c.Int(nullable: false));
            DropForeignKey("dbo.BranchOffices", "CreatorID", "dbo.AppUsers");
            DropIndex("dbo.BranchOffices", new[] { "CreatorID" });
            AlterColumn("dbo.BranchOffices", "Longitude", c => c.Int(nullable: false));
            AlterColumn("dbo.BranchOffices", "Latitude", c => c.Int(nullable: false));
            DropColumn("dbo.Reservations", "Deleted");
            DropColumn("dbo.VehicleTypes", "Deleted");
            DropColumn("dbo.Vehicles", "Deleted");
            DropColumn("dbo.Comments", "Deleted");
            DropColumn("dbo.BranchOffices", "Deleted");
            DropColumn("dbo.BranchOffices", "CreatorID");
            DropColumn("dbo.Services", "Deleted");
            CreateIndex("dbo.PriceLists", "Item_ItemID");
            CreateIndex("dbo.Items", "PriceListId_PriceListID");
            AddForeignKey("dbo.PriceLists", "Item_ItemID", "dbo.Items", "ItemID");
            AddForeignKey("dbo.Items", "PriceListId_PriceListID", "dbo.PriceLists", "PriceListID");
        }
    }
}
