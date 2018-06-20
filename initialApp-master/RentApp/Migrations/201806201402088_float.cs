namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _float : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.BranchOffices", "Latitude", c => c.Single(nullable: false));
            AlterColumn("dbo.BranchOffices", "Longitude", c => c.Single(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.BranchOffices", "Longitude", c => c.Int(nullable: false));
            AlterColumn("dbo.BranchOffices", "Latitude", c => c.Int(nullable: false));
        }
    }
}
