namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class rentaa : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Items", "PriceListID");
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
                    })
                .PrimaryKey(t => t.PriceListID);
            
            AddColumn("dbo.Items", "PriceListID", c => c.Int(nullable: false));
        }
    }
}
