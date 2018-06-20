namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class nn : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Items", "PriceListId_PriceListID", "dbo.PriceLists");
            DropForeignKey("dbo.PriceLists", "Item_ItemID", "dbo.Items");
            DropIndex("dbo.Items", new[] { "PriceListId_PriceListID" });
            DropIndex("dbo.PriceLists", new[] { "Item_ItemID" });
            AddColumn("dbo.BranchOffices", "CreatorID", c => c.Int(nullable: false));
            CreateIndex("dbo.BranchOffices", "CreatorID");
            AddForeignKey("dbo.BranchOffices", "CreatorID", "dbo.AppUsers", "Id", cascadeDelete: true);
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
            DropForeignKey("dbo.BranchOffices", "CreatorID", "dbo.AppUsers");
            DropIndex("dbo.BranchOffices", new[] { "CreatorID" });
            DropColumn("dbo.BranchOffices", "CreatorID");
            CreateIndex("dbo.PriceLists", "Item_ItemID");
            CreateIndex("dbo.Items", "PriceListId_PriceListID");
            AddForeignKey("dbo.PriceLists", "Item_ItemID", "dbo.Items", "ItemID");
            AddForeignKey("dbo.Items", "PriceListId_PriceListID", "dbo.PriceLists", "PriceListID");
        }
    }
}
