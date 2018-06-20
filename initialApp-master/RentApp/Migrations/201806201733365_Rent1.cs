namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Rent1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Vehicles", "CreatorID", c => c.Int(nullable: false));
            CreateIndex("dbo.Vehicles", "CreatorID");
            AddForeignKey("dbo.Vehicles", "CreatorID", "dbo.AppUsers", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Vehicles", "CreatorID", "dbo.AppUsers");
            DropIndex("dbo.Vehicles", new[] { "CreatorID" });
            DropColumn("dbo.Vehicles", "CreatorID");
        }
    }
}
