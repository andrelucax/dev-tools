using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DevTools.Server.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Clipboards",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Code = table.Column<string>(type: "character varying(6)", maxLength: 6, nullable: false),
                    Text = table.Column<string>(type: "text", nullable: true),
                    BlobId = table.Column<Guid>(type: "uuid", nullable: true),
                    DateCreatedUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clipboards", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Clipboards_Code",
                table: "Clipboards",
                column: "Code",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Clipboards");
        }
    }
}
